import { ChangeEvent } from "react";

interface Props {
    searchTitle: string;
    onChangeSearchTitle: (e: ChangeEvent<HTMLInputElement>) => void;
    findByTitle: () => void;
}

export const Search = ({ searchTitle, onChangeSearchTitle, findByTitle }: Props) => {
    return (
        <div className="col-12">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={onChangeSearchTitle}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByTitle}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}
