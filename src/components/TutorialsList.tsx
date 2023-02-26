// Hooks and Types React
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
// React Router DOM
import { useNavigate } from "react-router-dom";
// Services
import { getAllItem, removeAllItems, removeItem } from "../services/TutorialService";
// Interfaces
import { API_Params, ITutorialData } from '../types/Tutorial';
// Components
import { Search } from "./Search";
// React tables
import { CellProps, CellValue, Column, useTable } from 'react-table'
// Material UI
import { Pagination, Select, MenuItem, SelectChangeEvent } from "@mui/material";
// Sweet Alert
import Swal from "sweetalert2";

export const TutorialsList = () => {

  const [tutorials, setTutorials] = useState<Array<ITutorialData>>([]);
  const [searchTitle, setSearchTitle] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(3);

  const pageSizes = [3, 6, 9];

  const tutorialsRef = useRef<Array<ITutorialData>>([]);
  let navigate = useNavigate();

  tutorialsRef.current = tutorials;

  useEffect(() => {
    retrieveTutorials()
    // eslint-disable-next-line
  }, [page, pageSize]);

  const onChangeSearchTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (searchTitle: string, page: number, pageSize: number) => {
    let params: API_Params = {};

    if (searchTitle) {
      params['title'] = searchTitle;
    }

    if (page) {
      params['page'] = page - 1;
    }

    if (pageSize) {
      params['size'] = pageSize;
    }

    return params;
  };

  const retrieveTutorials = () => {
    const params = getRequestParams(searchTitle, page, pageSize);
    getAllItem(params)
      .then(({ data }) => {
        const { tutorials, totalPages } = data;
        setTutorials(tutorials);
        setCount(totalPages);
      })
      .catch((e: Error) => console.log(e))
  };

  const findByTitle = () => {
    setPage(1);
    retrieveTutorials();
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handlePageSizeChange = ({ target }: SelectChangeEvent<number>) => {
    setPageSize(target.value as number);
    setPage(1);
  };

  const refreshList = () => {
    retrieveTutorials();
  };

  const removeAllTutorials = () => {
    removeAllItems()
      .then(() => {
        refreshList();
      })
      .catch((e: Error) => console.log(e));
  };

  const openTutorial = (rowIndex: number) => {
    const id = tutorialsRef.current[rowIndex].id;
    navigate('/tutorials/' + id)
  };

  const deleteTutorial = (rowIndex: number) => {
    const id = tutorialsRef.current[rowIndex].id;
    removeItem(id)
      .then(() => {
        Swal.fire(`${tutorialsRef.current[rowIndex].title} Successfully Deleted.`, '', 'success');

        let newTutorials = [...tutorialsRef.current];
        newTutorials.splice(rowIndex, 1);

        setTutorials(newTutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns: Column<ITutorialData>[] = useMemo(() => [
    {
      Header: 'Title',
      accessor: 'title' as keyof ITutorialData,
    },
    {
      Header: 'Description',
      accessor: 'description' as keyof ITutorialData,
    },
    {
      Header: 'Status',
      accessor: 'published' as keyof ITutorialData,
      Cell: ({ value }: CellProps<ITutorialData>): CellValue => {
        return value ? 'Published' : 'Pending';
      }
    },
    {
      Header: 'Actions',
      accessor: 'actions' as CellValue,
      Cell: ({ row }: CellProps<ITutorialData>): JSX.Element => {
        const rowIdx = row.id;
        return (
          <div className='d-flex justify-content-center'>
            <span onClick={() => openTutorial(parseInt(rowIdx))}>
              <i className="far fa-edit action mx-2"></i>
            </span>
            <span onClick={() => deleteTutorial(parseInt(rowIdx))}>
              <i className="fas fa-trash action mx-2"></i>
            </span>
          </div>
        )
      }
    }
    // eslint-disable-next-line
  ], [])

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
  } = useTable<ITutorialData>({ columns, data: tutorials })

  return (
    <div className="list row">

      <Search searchTitle={searchTitle} onChangeSearchTitle={onChangeSearchTitle} findByTitle={findByTitle} />

      <div className="col-md-12 list">

        {"Items per Page: "}
        <Select
          onChange={handlePageSizeChange}
          value={pageSize}
        >
          {
            pageSizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))
          }
        </Select>

        <table
          className="table table-striped table-bordered table-hover mt-3"
          {...getTableProps()}
        >
          <thead>
            {
              headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {
                      row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <Pagination
          className="my-3"
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />

      </div>

      <div className="col-md-8">
        <button className="btn btn-danger" onClick={removeAllTutorials}>
          Remove All
        </button>
      </div>
    </div>
  )
}
