document.getElementById('project-form').addEventListener('submit', createProject);
document.getElementById('close-modal').addEventListener('click', closeModal);

let selectedProject = null;

function createProject(e) {
    e.preventDefault();
    const projectName = document.getElementById('project-name').value;
    const projectDescription = document.getElementById('project-description').value;
    const projectStartDate = document.getElementById('project-start-date').value;
    const projectEndDate = document.getElementById('project-end-date').value;

    const project = {
        name: projectName,
        description: projectDescription,
        startDate: projectStartDate,
        endDate: projectEndDate,
        tasks: [],
        resources: [],
        risks: [],
        reports: []
    };

    addProjectToList(project);
    document.getElementById('project-form').reset();
}

function addProjectToList(project) {
    const projectList = document.getElementById('project-list');

    const projectItem = document.createElement('li');
    projectItem.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <p><strong>Fecha de Inicio:</strong> ${project.startDate}</p>
        <p><strong>Fecha de Fin:</strong> ${project.endDate}</p>
    `;
    projectItem.addEventListener('click', () => openModal(project));
    projectList.appendChild(projectItem);
}

function openModal(project) {
    selectedProject = project;
    document.getElementById('modal-project-name').innerText = project.name;
    document.getElementById('modal-project-description').innerText = project.description;
    document.getElementById('modal-project-start-date').innerText = project.startDate;
    document.getElementById('modal-project-end-date').innerText = project.endDate;
    document.getElementById('task-list').innerHTML = '';
    document.getElementById('resource-list').innerHTML = '';
    document.getElementById('risk-list').innerHTML = '';
    document.getElementById('report-list').innerHTML = '';

    project.tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task;
        document.getElementById('task-list').appendChild(taskItem);
    });

    project.resources.forEach(resource => {
        const resourceItem = document.createElement('li');
        resourceItem.textContent = resource;
        document.getElementById('resource-list').appendChild(resourceItem);
    });

    project.risks.forEach(risk => {
        const riskItem = document.createElement('li');
        riskItem.textContent = risk;
        document.getElementById('risk-list').appendChild(riskItem);
    });

    project.reports.forEach(report => {
        const reportItem = document.createElement('li');
        reportItem.textContent = report;
        document.getElementById('report-list').appendChild(reportItem);
    });

    document.getElementById('project-details-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('project-details-modal').style.display = 'none';
}

document.getElementById('add-task').addEventListener('click', () => {
    const taskName = document.getElementById('task-name').value;
    if (taskName.trim() === '') return;
    selectedProject.tasks.push(taskName);

    const taskItem = document.createElement('li');
    taskItem.textContent = taskName;
    document.getElementById('task-list').appendChild(taskItem);
    document.getElementById('task-name').value = '';
});

document.getElementById('add-resource').addEventListener('click', () => {
    const resourceName = document.getElementById('resource-name').value;
    if (resourceName.trim() === '') return;
    selectedProject.resources.push(resourceName);

    const resourceItem = document.createElement('li');
    resourceItem.textContent = resourceName;
    document.getElementById('resource-list').appendChild(resourceItem);
    document.getElementById('resource-name').value = '';
});

document.getElementById('add-risk').addEventListener('click', () => {
    const riskName = document.getElementById('risk-name').value;
    if (riskName.trim() === '') return;
    selectedProject.risks.push(riskName);

    const riskItem = document.createElement('li');
    riskItem.textContent = riskName;
    document.getElementById('risk-list').appendChild(riskItem);
    document.getElementById('risk-name').value = '';
});

document.getElementById('generate-report').addEventListener('click', () => {
    const reportContent = prompt("Ingrese el contenido del informe:");
    if (reportContent.trim() === '') return;
    selectedProject.reports.push(reportContent);

    const reportItem = document.createElement('li');
    reportItem.textContent = reportContent;
    document.getElementById('report-list').appendChild(reportItem);
});