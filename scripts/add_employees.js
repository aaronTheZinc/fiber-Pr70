const { ApolloClient,
    InMemoryCache,
    useQuery,
    gql
} = require("@apollo/client")

const data = require('./employees')

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache()
});

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
      message
    }
  }
`;


const ENTERPRISE_TOKEN = "";


function AddEmployees() {
    const registeredEmployeeIds = [];

    data.employees.forEach(async (employee) => {

        const { data } = await client.mutate({
            mutation: CREATE_EMPLOYEE,
            variables: {
                token: ENTERPRISE_TOKEN,
                firstName: employee.first_name,

            }
        })
    })
}