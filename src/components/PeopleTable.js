import { LOAD_USERS } from '../redux/reducers/people/action';
import { useDispatch, useSelector } from 'react-redux';
import { getPeople } from '../redux/reducers/people/selector';
import PeopleTablePagination from './PeopleTablePagination';
import { Link } from 'react-router-dom';

function PeopleTable() {
    const { loading, data, page, search } = useSelector(getPeople);

    const dispatch = useDispatch();

    const changePage = newPage =>
        dispatch({
            type: LOAD_USERS,
            payload: { page: newPage, search: search },
        });

    const handlerSearch = e =>
        dispatch({
            type: LOAD_USERS,
            payload: { page: 1, search: e.target.value },
        });

    return (
        <>
            <h1>Star Wars People</h1>
            <form style={{ display: 'inline-block' }}>
                <input
                    style={{ padding: '5px', marginBottom: '20px' }}
                    type="text"
                    value={search}
                    onChange={handlerSearch}
                    placeholder="Search people..."
                />
            </form>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <table
                        border={1}
                        width="100%"
                        cellPadding={2}
                        cellSpacing={0}
                    >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Birth Year</th>
                                <th>Eye Color</th>
                                <th>Gender</th>
                                <th>Hair Color</th>
                                <th>Height</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {data?.results.map(
                                ({
                                    name,
                                    birth_year,
                                    eye_color,
                                    gender,
                                    hair_color,
                                    height,
                                    url,
                                }) => {
                                    const id = url.replaceAll(/\D/g, '');
                                    return (
                                        <tr key={name}>
                                            <td>{name}</td>
                                            <td>{birth_year}</td>
                                            <td>{eye_color}</td>
                                            <td>{gender}</td>
                                            <td>{hair_color}</td>
                                            <td>{height}</td>
                                            <td>
                                                <Link to={`/people/${id}`}>
                                                    Details
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>

                    <PeopleTablePagination
                        page={page}
                        total={data.count}
                        onChange={changePage}
                    />
                </>
            )}
        </>
    );
}

export default PeopleTable;
