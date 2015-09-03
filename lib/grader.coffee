class Grader
  @MAX_POINTS = 50.0
  @MAX_POINTS_PER_PROGRAM = 10.0

  constructor: (@testResults) ->

  calculateGrades: ->
    @selectHighestGrades(
      @calculateGradesPerProgram(@testResults)
    )

  calculateFinalGrades: ->
    gradesPerProgram = @selectHighestGrades(
      @calculateGradesPerProgram(@testResults)
    )

    required = @filterByRequiredPrograms(gradesPerProgram)
    extra = @filterByExtraCreditPrograms(gradesPerProgram)

    for identifier, grade of extra
      required[identifier] = grade

    required

  calculateFinalGrade: ->
    totalPoints = 0
    grades = @calculateFinalGrades(@testResults)
    totalPoints += grade for identifier, grade of grades
    totalPoints

  calculateGradePercentage: (grade, max) ->
    Math.round((grade / max) * 1000) / 10

  # protected

  filterByRequiredPrograms: (grades) ->
    required = {
      prog1: grades.prog1,  # required
      prog2: grades.prog2,  # required
    }

    for progs in [['prog3', 'prog4'], ['prog5', 'prog6'], ['prog7', 'prog8']]
      maxId = @selectMaxBetween(progs[0], progs[1], grades)
      required[maxId] = if grades[maxId]? then grades[maxId] else 0

    required

  filterByExtraCreditPrograms: (grades) ->
    extraCreditGrades = {}

    for identifier, grade of grades
      if ['prog9', 'prog10', 'prog11', 'prog12'].indexOf(identifier) > -1
        extraCreditGrades[identifier] = grade

    extraCreditGrades

  selectMaxBetween: (identifier1, identifier2, grades) ->
    if grades[identifier1]?
      if grades[identifier2]?
        if grades[identifier1] > grades[identifier2]
          identifier1
        else
          identifier2
      else
        identifier1
    else
      identifier2

  selectHighestGrades: (grades) ->
    highestGrades = {}

    for identifier, gradeList of grades
      highestGrades[identifier] = Math.max.apply(null, gradeList)

    highestGrades

  calculateGradesPerProgram: (testResults) ->
    programGrades = {}

    for testResult in testResults
      unless programGrades[testResult.identifier]?
        programGrades[testResult.identifier] = []

      programGrades[testResult.identifier].push(
        @calculateGradeForProgram(testResult)
      )

    programGrades

  calculateGradeForProgram: (testResult) ->
    # under/at/over par?
    percentage = @calculateParPercentage(testResult)

    # How much does each test cost?
    # Subtract failing tests from final percentage
    unless testResult.didSucceed()
      percentagePointsPerCase = percentage / testResult.testCases.length
      percentage -= testResult.numFailed() * percentagePointsPerCase

    Grader.MAX_POINTS_PER_PROGRAM * percentage

  calculateParPercentage: (testResult) ->
    totalCommands = 0

    for command in testResult.program.split("\n")
      if command.length > 0
        totalCommands += 1

    par = totalCommands - testResult.testClass.tightSteps

    # at or under par = A
    # 1 or 2 steps over = B
    # 3 or 4 steps over = C
    if par <= 0
      1
    else if par > 0 && par <= 2
      0.899
    else
      0.799
