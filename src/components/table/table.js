import {makeData, Logo, Tips} from "./Utils";
import Cell from "../cell/cell";
import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class Table extends React.Component {
  constructor() {
    super();
    this.selectValue = this.selectValue.bind(this);
    this.copyValue = this.copyValue.bind(this);
    this.state = {
      data: makeData(),
      selectedValues: []
    };
  }

  selectValue(dragIndex, value) {
    const {selectedValues} = this.state;
    console.log(selectedValues, '>>>>>>>>>>>>>>>>>>', dragIndex, value);
    let newState = selectedValues;
    if (!!selectedValues[dragIndex]) {
      newState = selectedValues.map((val, index) => {
        return index === dragIndex ? value : val;
      });
    }
    else {
      newState[dragIndex] = value;
    }
    console.log(newState, '<<<<<<<<<<<<<<<<<<<<<<<');
    this.setState({selectedValues: newState});
  }

  copyValue(startIndex, endIndex) {
    const {selectedValues} = this.state;
    const newState = selectedValues.map((val, index) => {
      return endIndex == index ? selectedValues[startIndex] : val;
    });
    this.setState({selectedValues: newState});
  }

  render() {
    const {data} = this.state;
    console.log(this.state.selectedValues);
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Name",
                columns: [
                  {
                    Header: "First Name",
                    accessor: "firstName"
                  },
                  {
                    Header: "Last Name",
                    id: "lastName",
                    accessor: d => d.lastName
                  }
                ]
              },
              {
                Header: "Info",
                columns: [
                  {
                    Header: "Age",
                    accessor: "age"
                  },
                  {
                    Header: "Status",
                    // accessor: "status"
                    Cell: row => (
                      <Cell options={['single', 'complicated', 'relationship']} index={row.index} sourceIndex={null}
                            selectValue={this.selectValue} key={row.index} copyValue={this.copyValue}
                            selection={this.state.selectedValues}/>
                    )
                  }
                ]
              },
              {
                Header: 'Stats',
                columns: [
                  {
                    Header: "Visits",
                    accessor: "visits",
                    Cell: row => (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#dadada',
                          borderRadius: '2px'
                        }}
                      >
                        <p>{console.log(row)}</p>
                        <div
                          style={{
                            width: `${row.value}%`,
                            height: '100%',
                            backgroundColor: row.value > 66 ? '#85cc00'
                              : row.value > 33 ? '#ffbf00'
                                : '#ff2e00',
                            borderRadius: '2px',
                            transition: 'all .2s ease-out'
                          }}
                        />
                      </div>
                    )
                  }
                ]
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br/>
          {/*<Tips />*/}
          {/*<Logo />*/}
        </div>
      </DragDropContextProvider>
    );
  }
}

export default Table;
