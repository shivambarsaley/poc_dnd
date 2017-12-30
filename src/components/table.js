import {makeData, Logo, Tips} from "./Utils";
import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }

  render() {
    const {data} = this.state;
    return (
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
                    <select>
                      {['single','complicated', 'relationship'].map(value => <option value={value}>{value}</option>)}
                    </select>
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
    );
  }
}

export default Table;
