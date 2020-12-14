
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/recipeRow.css'

export default class recipeRow extends React.Component {
    renderTableData(rowData) {
        return rowData.map((row, i) => {
            let col = Object.keys(row)
            return (
                <tr key={row.id}>
                    {col.map((val, i) => {
                    return <td key={i}>{row[col[i]]}</td>
                    })}
                </tr>
            );
        })
    }

    renderTableHeader(headerData) {
        console.log(headerData)
        return headerData.map((col, i) => {
            return <th key={i}>{col.name} </th>;
        })
    }

    render() {
        const props = this.props;
        return (
            <div>
                <table id='rows'>
                    <tbody>
                    <tr>{this.renderTableHeader(props.metadata)}</tr>
                    {this.renderTableData(props.rows)}
                    </tbody>
                </table>
            </div>
        )
    }
}