import { useSelector } from 'react-redux';
import { getPeopleDetails } from '../redux/reducers/peopleDetails/selectors';
function Details() {
    const { loading, data } = useSelector(getPeopleDetails);

    if (loading) {
        return <div>Loading...</div>;
    }

    const { birth_year, name, skin_color, mass } = data;

    return (
        <div>
            <h1>{name}</h1>
            <h4>{birth_year}</h4>
            <p>Skin: {skin_color}</p>
            <p>Mass: {mass}</p>
        </div>
    );
}

export default Details;
