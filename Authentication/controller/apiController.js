const data = {
    employees: require('../model/data.json'),
    setEmployees: function(data) {this.employees = data}
}

const getAllEmployees = (req, res) => {
    res.json(data);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees?.length?data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    }
    if(!firstname || !lastname) {
        return res.status(400).json({'message': 'firstname and lastname are required!'})
    }
    data.setEmployees([...data.employees, newEmployee]);
    res.status(200).json({'message': 'New Employee created', newEmployee})
}

const updateEmployees = (req,  res) => {
        const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
        if(!employee) {
            return res.status(400).json({'message': 'The given employee ID is not found!'});
        }
        if (req.body.firstname) employee.firstname = req.body.firstname;
        if (req.body.lastname) employee.lastname = req.body.lastname;
        const filteredArray = data.employees.filter(emp => empmp.id !== req.body.id);
        const unsortedArray = [...filteredArray, employee];
        data.setEmployees(unsortedArray.sort((a,  b) => a.id - b.id));
        res.status(200).json({'message': 'Employee successfully updated', employee});
    }

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.iid === parseInt(req.body.id));
    if(!employee) {
            return res.status(400).json({'message': 'The given employee ID is not found!'});
        }
    const filteredArray = data.employees.filter(emp => empmp.id !== req.body.id);
    data.setEmployees([...filteredArray]);
    res.status(200).json({'message': 'Employee successfully deleted', employee});
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.iid === parseInt(req.params.id));
    if(!employee) {
            return res.status(400).json({'message': 'The given employee ID is not found!'});
        }
    res.status(200).json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployees,
    deleteEmployee,
    getEmployee
}