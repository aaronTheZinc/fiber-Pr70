const { request, gql, GraphQLClient } = require('graphql-request');
const { employees } = require('./employees');


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

const EDIT_EMPLOYEE = gql`
  mutation employee($token: String!, $employee: String! $fields: [VreelFields!]!) {
    updateEmployee(token: $token, fields: $fields, employee: $employee) {
      message
    }
  }
`;


const endpoint = 'https://staging.vreel.page/graphql'
const ENTERPRISE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhZmIwb3EyM2FrajlnNHFrMTlnIiwiYWNjb3VudF90eXBlIjoiZW50ZXJwcmlzZSIsImV4cCI6MTY1NTE3MTg1OH0.ZoAaz8VABQfPsAIv0kenL-LMWU9XrdkYF97HGdQn4Gg";

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: 'Bearer MY_TOKEN',
  },
})

const employeeIdStack = []
// data.employees.forEach((employee) => {
//   (async () => {
//     const variables = {
//       token: ENTERPRISE_TOKEN,
//       firstName: employee.first_name,
//       lastName: employee.last_name,
//       email: employee.email,
//       password: "",
//       username: "",
//       accountType: "employee"
//     }
//     const data = await client.request(CREATE_EMPLOYEE, variables);
//     console.log(data)
//   })()
// })
function UpdateEmployee(employeeId, email) {
  const employee = employees.find((item => item.email === email))

  const fields = []

  for (const [key, value] of Object.entries(employee)) {
    fields.push({
      field: key,
      value
    })
  }

  const variables = {
    token: ENTERPRISE_TOKEN,
    fields,
    employee: employeeId

  }

  console.log(variables)

  const data = client.request(EDIT_EMPLOYEE, variables);
}
UpdateEmployee("cafb25q23akj9g4qk1gg", "ggradvohl@avaicg.com");
console.log("----------->COMPLETE<-----------")