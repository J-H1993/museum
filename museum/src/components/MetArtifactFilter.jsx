import { useState, useEffect } from 'react';
import { getDepartments } from '../utils/api';

const MetArtifactFilter = ({ selectedDepartment, setSelectedDepartment }) => {
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getDepartments()
            .then((departmentsData) => {
                setDepartments(departmentsData);
            })
            .catch((error) => {
                console.error('Error fetching department information:', error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleSelectedDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    return (
        <form>
            <label htmlFor="select-department">Select department</label>
            <select
                id="select-department"
                value={selectedDepartment}
                onChange={handleSelectedDepartmentChange}
            >
                <option value="">All</option>
                {departments.map((department) => (
                    <option key={department.departmentId} value={department.departmentId}>
                        {department.displayName}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default MetArtifactFilter;
