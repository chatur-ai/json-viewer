import { Button, Card, CardBody, CardFooter, CardHeader, DataTable, grommet, Grommet, Header, PageHeader, Text, TextArea } from "grommet"
import { Favorite, ShareOption } from "grommet-icons"
import { React, useReducer } from "react"
import { extractColumns } from "./utils"


function reducer(state, action) {
  switch (action.type) {
    case 'input_text': {
      try {
        const parsedJson = JSON.parse(action.value)
        const parsedColumns = extractColumns(parsedJson)
        return {
          textInput: action.value,
          jsonInput: {
            columns: parsedColumns,
            data: parsedJson
          },
          errors: []
        }
      } catch (e) {
        return {
          textInput: action.value,
          jsonInput: undefined,
          errors: ["Please input a valid JSON string"]

        }
      }
    }
    default: return state
  }
}

const initialState = {
  textInput: undefined,
  jsonInput: undefined,
  errors: []
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state)
  return (
    <Grommet full theme={grommet}>
      <Header background="brand">
        <Text>chatur.ai</Text>
      </Header>
      <PageHeader title="chatur.ai" subtitle="supercharge your development with AI" actions={<Button label="Try it out" primary />} />
      <Card background="light-1">
        <CardHeader pad="medium">Header</CardHeader>
        <CardBody pad="medium">Body</CardBody>
        <CardFooter pad="medium" background="light-2">
          <Button icon={<Favorite color="red" />} hoverIndicator />
          <Button icon={<ShareOption color="plain" />} hoverIndicator />
        </CardFooter>
      </Card>
      <TextArea placeholder="Enter JSON" value={state.textInput} onChange={event => dispatch({ type: "input_text", value: event.target.value })} />
      {state.jsonInput && <DataTable columns={state.jsonInput.columns} data={state.jsonInput.data} sortable />}
    </Grommet>
  )
}

export default App
