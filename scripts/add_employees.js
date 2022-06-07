const { request, gql, GraphQLClient } = require('graphql-request');
const { employees } = require('./employees');

const data = require('./employees')

const CREATE_EMPLOYEE = gql`
  mutation employees(
    $token: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $username: String!
    $accountType: String!
  ) {
    addEmployeeToEnterprise(
      token: $token
      newUser: {
        first_name: $firstName
        last_name: $lastName
        email: $email
        account_type: $accountType
        username: $username
        password: $password
      }
    ) {
      id
    }
  }
`;

const endpoint = 'http://localhost:8080/graphql'
const ENTERPRISE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhZjFlNmZicGw1NHRkNnVsbjdnIiwiYWNjb3VudF90eXBlIjoiZW50ZXJwcmlzZSIsImV4cCI6MTY1NTE3MDUwM30.snj9joWcnYWN0nwCDpBNVONoDS1HlEZ7N8QBiu013X0";

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: 'Bearer MY_TOKEN',
  },
})

const employeeIdStack = []
data.employees.forEach((employee) => {
  (async () => {
    const variables = {
      token: ENTERPRISE_TOKEN,
      firstName: employee.first_name,
      lastName: employee.last_name,
      email: employee.email,
      password: "",
      username: "",
      accountType: "employee"
    }
    const data = await client.request(CREATE_EMPLOYEE, variables);
    console.log(data)
  })()
})
console.log("----------->COMPLETE<-----------")