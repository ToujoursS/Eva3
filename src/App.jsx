import { useState } from "react";

const App = () => {

    /* Variables a utilizar */
    const [nombre, setNombre] = useState("");
    const [monto, setMonto] = useState("");
    const [tasa, setTasa] = useState("");
    const [plazo, setPlazo] = useState("");
    const [resultado, setResultado] = useState(null);
    const [estado, setEstado] = useState("");

    const calcular = (e) => {
        e.preventDefault() /* Detener el envio del formulario */

        if (!nombre || !monto || !tasa || !plazo) {
            alert("Por favor, complete todos los campos")
            return;
        }

        const montofloat = parseFloat(monto);  //post prueba: corregido el float
        const tasafloat = parseFloat(tasa);
        const plazoentero = parseInt(plazo, 10);

        const cuota = ((montofloat + (montofloat * tasafloat / 100)) / plazoentero);
        /*            (Monto + (Monto × Tasa / 100)) / Plazo  */

        let clasificacion;
        if (cuota > 250000) clasificacion = "Advertencia de endeudamiento";
        else if (cuota > 100000 && cuota < 250000) clasificacion = "Cuota Moderada";
        else if (cuota < 100000) clasificacion = "Cuota Comoda";
        else clasificacion = "Cuota";

        setResultado(cuota.toFixed(3));
        setEstado(clasificacion);
    }

    const limpiar = () => {
        setNombre("");
        setMonto("");
        setTasa("");
        setPlazo("");
        setResultado(null);
        setEstado("");
    }

    const obtenerColor = () => {
        if (estado === "Cuota Comoda") return "success"; //post prueba: corregido la tipologia con L31
        if (estado === "Cuota Moderada") return "warning";  //post prueba: corregido la tipologia con L30
        if (estado === "Advertencia de endeudamiento") return "danger";
        return "secondary"
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0" >Simulador de Cuotas de Crédito</h3>
                        </div>

                        <div className="card-body">
                            <form onSubmit={calcular}>
                                {/* Input nombre */}
                                <div className="mb-3">
                                    <label className="form-label">Nombre cliente: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>

                                {/* Input monto */}
                                <div className="mb-3">
                                    <label className="form-label">Monto prestamo (CLP | Ingresar con . como separador decimal de miles): </label>
                                    <input type="number"
                                        className="form-control"
                                        value={monto}
                                        onChange={(e) => setMonto(e.target.value)}
                                    />
                                </div>

                                {/* Input tasa */}
                                <div className="mb-3">
                                    <label className="form-label">Tasa interes mensual (%): </label>
                                    <input type="number"
                                        className="form-control"
                                        value={tasa}
                                        onChange={(e) => setTasa(parseFloat(e.target.value)) || 0}
                                    />
                                </div>

                                {/* Input plazo */}
                                <div className="mb-3">
                                    <label className="form-label">Plazo en meses: </label>
                                    <input type="number"
                                        className="form-control"
                                        step="1"
                                        value={plazo}
                                        onChange={(e) => setPlazo(e.target.value)}
                                    />
                                </div>

                                {/* Botones */}
                                <div className="d-flex gap-2">
                                    <button className="btn btn-primary" type="submit" >
                                        Calcular
                                    </button>
                                    <button className="btn btn-secondary"
                                        type="button"
                                        onClick={limpiar}>
                                        Limpiar
                                    </button>
                                </div>
                            </form>


                            {resultado && (
                                <div className={`alert alert-${obtenerColor()} my-4`}>
                                    <h5>Resultado</h5>
                                    <p>
                                        <strong>Cliente: </strong> {nombre}
                                    </p>
                                    <p>
                                        <strong>Valor Cuota Mensual: </strong> {resultado}
                                    </p>
                                    <p>
                                        <strong>Categoria / Estado: </strong> {estado}
                                    </p>
                                </div>
                            )}


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}


export default App

