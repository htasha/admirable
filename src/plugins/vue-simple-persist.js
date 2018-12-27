let clients = [{
        date: "15/12/2018",
        fullName: "Marcano Ahsath",
        idDoc: 24897942,
        contactPhone: "04241773316",
        phone: "HUAWEI Mate 9 Lite",
        imei: "008468123189132484",
        description: "Cambio puerto carga",
        technician: "Miguel",
        status: "Garantía"
    },
    {
        date: "24/12/2018",
        fullName: "Fernando jaramillo",
        idDoc: 59798855,
        contactPhone: "04241998855",
        phone: "Samsung s3 mini",
        imei: "054567868654854",
        description: "Pantalla completa",
        technician: "Marcano",
        status: "En reparación"
    },
    {
        date: "24/12/2018",
        fullName: "Fernando Correia",
        idDoc: 59798138,
        contactPhone: "04241998855",
        phone: "Samsung s3 mini",
        imei: "054567868654854",
        description: "Pantalla completa",
        technician: "Marcano",
        status: "Esperando repuesto"
    }
]

export default store => store.commit('clients/SET_STATE', clients)