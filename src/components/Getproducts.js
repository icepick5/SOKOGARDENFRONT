
const Getproducts = () => {


    return (
        <div className="row">
            <h3 className="mt-5">Available Products</h3>
 
            <div className="col-md-3 justify-content-center mb-4">
                {/* Card with equal size */}
                <div className="card shadow card-margin">

                        <img 
                            className=" product_img mt-4"
                            src="logo.png"
                        />
                    {/* Card Body with a dummy Product */}
                    <div className="card-body">
                        <h5 className="mt-2">Unga</h5>
                        <p className="text-muted">This is Nice Soft Ugali</p>
                        <b className="text-warning">200 KES</b>  <br />

                    </div>
                </div>
            </div>
    </div>
    );

}

export default Getproducts;
