import { Card, CheckBox, DataTable, Grid, List, NameValueList, NameValuePair, Text } from "grommet"
import { countBy, extend, flatten, forEach, isArray, isBoolean, isNumber, isObject, isString, keys, map, mapObject, max, object, sample, uniq } from "underscore"

const renderString = (datum, key) => <Text>{datum[key]}</Text>
const renderNumber = (datum, key) => <Text>{datum[key]}</Text>
const renderBoolean = (datum, key) => <CheckBox checked={datum[key]} />
const renderList = (datum, key) => <List data={datum[key]} />
const renderObject = (datum, key) => renderJsonCards(datum[key], true)

const renderArray = (datum, key) => {
    const sampleDatum = sample(datum[key])
    return isObject(sampleDatum) ? renderJsonCards(datum[key]) : renderList(datum, key)
}

export const renderJsonCards = (json, inner) => {
    const data = isArray(json) ? json : [json] // Object >> Array
    const extracted = extractKeyMetadata(data)
    return (
        <Grid gap="small" columns="fit">
            {map(data, (datum, index) => {
                return (
                    <Card background="white" pad="medium" key={index}>
                        <NameValueList key={index} layout="grid">
                            {map(keys(datum), key => {
                                return (
                                    <NameValuePair name={key} key={key}>
                                        {extracted.metadata[key].render(datum, key)}
                                    </NameValuePair>
                                )
                            })}
                        </NameValueList>
                    </Card>
                )
            })}
        </Grid>
    )
}

export const renderJsonTable = (json) => {
    const data = isArray(json) ? json : [json] // Object >> Array
    const extracted = extractKeyMetadata(data)
    const columns = extractColumns(extracted)
    return <DataTable columns={columns} data={data} sortable verticalAlign="top" />
}

const inferRender = (data, key) => {
    const sampleDatum = sample(data)[key]
    return sampleDatum ? (isString(sampleDatum) ? renderString : isNumber(sampleDatum) ? renderNumber : isBoolean(sampleDatum) ? renderBoolean : isArray(sampleDatum) ? renderArray : renderObject) : inferRender(data, key)
}

const extractKeyMetadata = (data) => {
    const allKeys = uniq(flatten(map(data, datum => keys(datum))))
    const keyUsage = map(allKeys, key => countBy(data, datum => datum[key] ? 'exists' : 'missing'))
    const maxKeyUsage = max(keyUsage, usage => usage['exists'] || 0)["exists"] || 0
    forEach(keyUsage, usage => usage['primary'] = (usage['exists'] || 0) === maxKeyUsage)
    const keyMetadata = object(allKeys, keyUsage)
    mapObject(keyMetadata, (metadata, key) => extend(metadata, { render: inferRender(data, key) }))
    return {
        keys: allKeys,
        metadata: keyMetadata
    }
}
const extractColumns = (extracted) => {
    return map(extracted.keys, function (key) {
        return {
            property: key,
            header: <Text>{key}</Text>,
            search: false,
            sortable: true,
            primary: extracted.metadata[key].primary,
            render: datum => extracted.metadata[key].render(datum, key)
        }
    })
}