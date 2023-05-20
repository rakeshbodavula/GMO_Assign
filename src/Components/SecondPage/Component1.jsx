import { useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';


const Component1 = () => {
    // state to store api data
    const [apiData, setApiData] = useState([])

    // using axios to fetch data from 3rd party api
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.data)
        .then(data => setApiData(data))
        .catch(err => console.log(err))

    // defining columns for grid
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'userid', headerName: 'userID', width: 90 },
        { field: 'title', headerName: 'title', width: 150 },
        { field: 'body', headerName: 'body', width: 200 },
    ]

    return (
        <div>
            {apiData.length === 0 && <h1>Loading....</h1>}
            {apiData.length > 0 &&
                <DataGrid
                    rows={apiData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            }
        </div>
    )
}

export default Component1