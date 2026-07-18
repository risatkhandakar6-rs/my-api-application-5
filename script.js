let allIssue = [];

const loadAllIssue = () => {
  manageSpinner(true)
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url).then((res) => res.json()).then((data) => {
    allIssue = data.data
    displayAllIssue(allIssue)

  })
}
const getPriorityBadge = (priority) => {
  if (priority === 'low') return 'bg-gray-100 text-gray-500';
  if (priority === 'medium') return 'bg-orange-100 text-orange-500';
  if (priority === 'high') return 'bg-red-100 text-red-500';
  return 'bg-gray-100 text-gray-500';
  
}
const displayAllIssue = (datas) => { 
  manageSpinner(false)
  console.log(datas)
  const issueContainer = document.getElementById('container-issues');
  issueContainer.innerHTML = "";
  datas.forEach((data) => {
    const issues = document.createElement('div');
    issues.innerHTML = `
      <div class="pr-8 sm:pr-0  shadow-md bg-[#FFFFFF]  rounded-lg border-t-2 ${data.status === 'open' ? 'border-green-600' : 'border-purple-400'}">
        <div class="flex justify-between  pt-6 ">
         <img src="${data.status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed- Status .png'}" alt="" class="pl-10">
          <p class=" rounded-xl w-25 text-center mr-10 ${getPriorityBadge(data.priority)}">${data.priority}</p>
        </div>
        <h2 class="font-bold pl-10 text-2xl pt-4 ">${data.title}</h2>
        <p class="pl-10 pt-2 ">${data.description}</p>
        <div class="flex gap-3 pl-10 pt-6 pb-4 ">
          ${data.labels.map(label => `<p class="bg-red-100 rounded-lg p-1">${label}</p>`).join("")}
        </div>
        <div class="pl-10 pt-3 border-t border-gray-200 ">
          <p>#${data.id} by john_doe</p>
          <p>${data.createdAt}</p>
        </div>
      </div> 
      
      
    `;
    
     issues.addEventListener('click', () => {
      displayModal(data);
    });

    issueContainer.appendChild(issues);
  })

  const displayModal = (issue) => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = "";
    const modalHtml = document.createElement('div');
    modalHtml.innerHTML=`<h1 class="font-bold text-2xl pl-5 mb-3">${issue.title}</h1>
        <div class="flex pl-5 ">
          <h5 class=" rounded-full p-2 ${issue.status ==='open' ? 'bg-green-400' :'bg-purple-400'}">${issue.status}</h5>
          <ul class="flex items-center gap-3 pl-5">
            <li>. ${issue.author}</li>
            <li>.${issue.createdAt}</li>
          </ul>
        </div>
        <div class="flex gap-3 pt-10 pl-5">
          ${issue.labels.map(label => `<p class="btn btn-active ${label === 'bug' ? 'btn-error' : 'btn-warning'} rounded-full">${label}</p>`).join("")}
        </div>
        <p class="pt-10 text-gray-500 pl-5">${issue.description }n</p>
        <div class="flex justify-between w-11/12 bg-slate-100 mx-auto px-5 mt-7 p-6">
          <div>
            <p class="text-gray-600 font-bold">Assignee:</p>
            <h4 class="font-bold ">${issue.assignee ? issue.assignee : "No Name"}</h4>
          </div>
          <div>
            <p class="font-bold text-gray-600">Priority:</p>
            <p class="btn btn-active btn-error rounded-full">${issue.priority}</p>
          </div>
        </div>
`
    modalContainer.appendChild(modalHtml);
    document.getElementById('my_modal_5').showModal();
  }

}

const manageSpinner = (load) => {
  if (load == true) {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('container-issues').classList.add('hidden');

  } else {
    document.getElementById('container-issues').classList.remove('hidden');
    document.getElementById('loading').classList.add('hidden');
  }
}
document.getElementById('all-btn').addEventListener('click', () => {
  manageSpinner(true);
  setTimeout(() => {
    const totalIssues = document.getElementById('total-issues');
  totalIssues.innerText = `50 Issues`;
  displayAllIssue(allIssue);
  },400)

})
document.getElementById('open-btn').addEventListener('click', () => {
  manageSpinner(true);
  setTimeout(() => {
    const filtered = allIssue.filter((issue) => issue.status !== 'closed');
  const totalIssues = document.getElementById('total-issues');
  totalIssues.innerText = `44 Issues`;
  
  displayAllIssue(filtered);

  },400)
})
document.getElementById('closed-btn').addEventListener('click', () => {
  manageSpinner(true);
  setTimeout(() => {
    const filteredCloseed = allIssue.filter((closed) => closed.status !== 'open');
   const totalIssues = document.getElementById('total-issues');
  totalIssues.innerText = `6 Issues`;
  displayAllIssue(filteredCloseed);
  }, 400);
 
  
})

loadAllIssue()

document.getElementById('btn-search').addEventListener('click', () => {
  const input = document.getElementById('input-search');
  const inputValue = input.value.trim().toLowerCase();
  console.log(inputValue);
 
    const filterIssues = allIssue.filter((issue)=>{  
    const issueMatch = issue.title?.toLowerCase().includes(inputValue);
    const decMatch = issue.description?.toLowerCase().includes(inputValue);
      const statusMatch = issue.status?.toLowerCase().includes(inputValue);
      const priMatch = issue.priority?.toLowerCase().includes(inputValue);
      const autMatch = issue.author?.toLowerCase().includes(inputValue);
      const labelsMatch = issue.labels?.some((label) => label.toLowerCase().includes(inputValue));
      return issueMatch || decMatch || statusMatch || labelsMatch || priMatch || autMatch;
    
    })
    
  const totalIssue = document.getElementById('total-issues');
  totalIssue.innerText = `${filterIssues.length} Issues`
      displayAllIssue(filterIssues);
    });
  