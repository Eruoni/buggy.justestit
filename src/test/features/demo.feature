Feature: Demo

    @demo
    Scenario: Demo Scenario
        Given User login as:
            | Username          | Password       |
            | automation_demo10 | Automation@123 |
        When User comes to Popular Model from Home Page
        And User leaves a comment: "Automation Comment"
        And User vote for the car
        Then User should see comment added confirmation message
        And User should see their comment displayed at the top of the Review table
        When User log out
        Then User should see login form displayed