import React from "react";


const Pagination = ({dataPage, setDataPage}) => {


    let {page, totalPage} = dataPage;

    function handleSelectPage(idx) {
        if (idx !== page) {
            setDataPage({
                ...dataPage,
                page: idx,
            });
        }
    }

    function handlePrev() {
        if (page > 0) {
            setDataPage({
                ...dataPage,
                page: page - 1,
            });
        }
    }

    function handleNext() {
        if (page < totalPage - 1) {
            setDataPage({
                ...dataPage,
                page: page + 1,
            });
        }
    }

    return (

        <div>
            <ul className="pagination" id="paging">
                <li className={`page-item ${dataPage.page === 0 ? 'disabled' : ''}`}>
                    <button className="page-link" tabIndex="-1" aria-disabled="true"
                            onClick={handlePrev}>Previous</button>
                </li>
                {[...Array(dataPage.totalPage)].map((_, idx) => (
                    <li key={idx} className={`page-item ${dataPage.page === idx ? 'active' : ''}`}>
                        <button className="page-link" data-page={idx}
                                onClick={() => handleSelectPage(idx)}>{idx + 1}</button>
                    </li>
                ))}
                <li className={`page-item ${dataPage.page === dataPage.totalPage - 1 ? 'disabled' : ''}`}
                    onClick={handleNext}>
                    <button className="page-link" data-page={dataPage.page + 1}>Next</button>
                </li>
            </ul>
        </div>

    )
}

export default Pagination