const data = {
     employees: require('../data/data.json'),
     setEmployees: function (data) { this.employees = data;}

}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees?.length ? data.employees[data.employees.length -1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if(!newEmployee.firstname || !newEmployee.lastname){
        return res.status(400).json({ 'message': 'Firstname and last name are required'});
}
    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json({'message': 'New employee created', newEmployee});
}

const updateEmployee = (req, res) => {
        const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
        if(!employee){
            return res.status(400).json({ 'message': 'The employee ID is not listed'});
        }
        if (req.body.firstname) employee.firstname = req.body.firstname;
        if (req.body.lastname) employee.lastname = req.body.lastname;
  
   const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
   const unsortedArray = [...filteredArray, employee]
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.status(200).json({'message': 'Employee Updated', employee});
  }

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee) {
        return res.status(400).json({ 'message': 'The employee ID is not listed'});
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.status(200).json({ 'message': 'Employee deleted', employee});
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
     if(!employee) {
        return res.status(400).json({ 'message': 'The employee ID is not listed'});
    }
    res.status(200).json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}