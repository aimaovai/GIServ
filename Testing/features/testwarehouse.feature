Feature: Test Warehouse Management
    In order to see how Warehouse Management works with different scenarios

    Background:
        Given I am on the Login Page
        When I fill in placeholder "Id" with "1"
        When I fill in placeholder "password" with "admin"
        When I press "Login"
        Then I wait for 5 seconds
        Then I should be on the "dashboard" page




    # @login
    # Scenario:  UI Login
    #     Given I am on the Login Page
    #     When I fill in placeholder "Id" with "<Id>"
    #     When I fill in placeholder "password" with "<password>"
    #     When I press "Login"
    #     Then I wait for 5 seconds
    #     Then I should be on the "<pagename>" page

    #     Examples:
    #         | Id | password | pagename  |
    #         | 1  | admin    | dashboard |

    @AddVendor
    Scenario: Add a Vendor
        When I click on "Vendor"
        Then I should be on the "vendor" page
        And I wait for 2 seconds
        When I fill in placeholder "name" with "Cadbury"
        When I press "Add Vendor"

    @AddOrder
    Scenario: Add a Order
        When I click on "Order"
        Then I should be on the "order" page
        And I wait for 2 seconds
        When I fill in placeholder "quantity" with "2"
        When I fill in placeholder "shippingdetails" with "US"
        When I click on 'Chicken' option of 'product' drop down
        When I press "Add Order"

    @AddEmployee
    Scenario: Add a Employee
        When I click on "Employee"
        Then I should be on the "employee" page
        And I wait for 2 seconds
        When I fill in placeholder "name" with "Jessy"
        When I fill in placeholder "role" with "Developer"
        When I press "Add Employee"

    @AddVehicle
    Scenario: Add a Vehicle
        When I click on "Vehicles"
        Then I should be on the "vehicles" page
        And I wait for 2 seconds
        When I fill in placeholder "name" with "BMW"
        When I fill in placeholder "number" with "5432"
        When I press "Add Vehicle"

    @AddProduct
    Scenario: Add a Product
        When I click on "Product"
        Then I should be on the "product" page
        And I wait for 2 seconds
        When I fill in placeholder "name" with "Walter"
        When I fill in placeholder "stock" with "22"
        When I fill in placeholder "price" with "5432"
        When I click on 'Bisleri' option of 'vendor' drop down
        When I press "Add Product"

    @logout
    Scenario: UI Logout
        # Given I am on the "dashboard" Page
        When I click on "Logout"
        Then I should be on the "Login" page