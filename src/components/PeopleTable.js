import { useSelector } from 'react-redux';
import { getPeople } from '../redux/reducers/people/selector';

function PeopleTable() {
    const { loading, data } = useSelector(getPeople);
    return (
        <>
            <h1>Star Wars People</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table border={1} width="100%" cellPadding={2} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Birth Year</th>
                            <th>Eye Color</th>
                            <th>Gender</th>
                            <th>Hair Color</th>
                            <th>Height</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.results.map(
                            ({
                                name,
                                birtd_year,
                                eye_color,
                                gender,
                                hair_color,
                                height,
                            }) => {
                                return (
                                    <tr key={name}>
                                        <td>{name}</td>
                                        <td>{birtd_year}</td>
                                        <td>{eye_color}</td>
                                        <td>{gender}</td>
                                        <td>{hair_color}</td>
                                        <td>{height}</td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default PeopleTable;
