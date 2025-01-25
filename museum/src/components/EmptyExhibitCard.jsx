const EmptyExhibitCard = () => {
    return (
        <div className="col-md-12 mb-4 text-center">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title"> No artworks currently part of this exhibit.</h4>
                    <p className="card-text">These exhibits are part of a live service that change overtime. Though there are currently no artworks to display here, watch this space!</p>
                </div>
            </div>
        </div>
    )
}

export default EmptyExhibitCard