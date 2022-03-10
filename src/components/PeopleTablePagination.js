import s from './PeopleTable.module.css';
const LIMIT = 10;

function PeopleTablePagination({ page, total, onChange = () => {} }) {
    const totalPages = Math.ceil(total / LIMIT);

    return (
        <div className={s.pagination}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                pageIndex => {
                    const isActive = pageIndex === page;
                    const action = () => {
                        if (pageIndex !== page) onChange(pageIndex);
                    };
                    return isActive ? (
                        <b className={s.item} key={pageIndex} onClick={action}>
                            {' '}
                            {pageIndex}{' '}
                        </b>
                    ) : (
                        <span
                            className={s.item}
                            key={pageIndex}
                            onClick={action}
                        >
                            {' '}
                            {pageIndex}{' '}
                        </span>
                    );
                },
            )}
        </div>
    );
}

export default PeopleTablePagination;
