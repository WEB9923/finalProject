import "./DraggableELement.scss";

export default function DraggableElement({data}) {
    return (
        <>
            <div className="draggable-card">
                <div className="draggable-card-image">
                    <img src={data.image} alt=""/>
                </div>
                <div className="draggable-card-body">
                    <h3>{data.brand}</h3>
                </div>
            </div>
        </>
    );
}
