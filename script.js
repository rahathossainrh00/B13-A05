// Login Function
const signInButton = document.getElementById('signInButton');
if (signInButton) {
    signInButton.addEventListener('click', function () {
        const enteredUsername = document.getElementById('usernameField').value;
        const enteredPassword = document.getElementById('passwordField').value;

        if (enteredUsername !== 'admin') {
            alert("Invalid Username ");
        } else if (enteredPassword !== 'admin123') {
            alert("Invalid Password");
        } else {
            window.location.href = "dashboard.html";
        }


    });
}


// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

// Fetch All Issues Function
function fetchAllIssues() {
    toggleSpinner(true)
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(data => {
            const issueList = data.data
            showIssueCards(issueList)

            document.getElementById("totalIssueCount").innerText = issueList.length
            highlightActiveFilter('all')
            toggleSpinner(false)
        })

}

//Display Issue Cards Function
function showIssueCards(issueList) {
    const cardArea = document.getElementById('issueCardArea')
    cardArea.innerHTML = ""

    issueList.forEach(issueItem => {
        const newCard = document.createElement("div")
        newCard.addEventListener("click", function () {
            showIssueDetail(issueItem)
        })

        let priorityBadge = "bg-[#FEECEC] text-[#EF4444]";
        if (issueItem.priority === 'medium') priorityBadge = "bg-[#FEF3C7] text-[#D97706]";
        if (issueItem.priority.toLowerCase() === "low") priorityBadge = "bg-[#DEFCE8] text-[#00A96E]";

        let statusIcon = "assets/Open-Status.png";
        if (issueItem.status.toLowerCase() === 'closed') statusIcon = "assets/Closed-Status.png";

        let topBorderColor = "border-[#02a86e]"
        if (issueItem.status.toLowerCase() === 'closed') topBorderColor = "border-[#a854f7]"

        const labelsHtml = issueItem.labels.map(singleLabel => {
            let labelBgColor = "";
            let labelIcon = ";";

            if (singleLabel.toLowerCase() === "bug") {
                labelBgColor = "bg-[#FEECEC] text-[#EF4444] border-[#FECACA] hover:bg-[#EF4444] hover:text-white";
                labelIcon = "fa-solid fa-bug"
            } else if (singleLabel.toLowerCase() === "help wanted") {
                labelBgColor = "bg-[#FFF8DB] text-[#D97706] border-[#FDE68A] hover:bg-[#D97706] hover:text-white ";
                labelIcon = "fa-solid fa-life-ring"
            } else if (singleLabel.toLowerCase() === "enhancement") {
                labelBgColor = "bg-[#DEFCE8] text-[#00A96E] border-[#BBF7D0] hover:bg-[#00A96E] hover:text-white";
                labelIcon = "fa-solid fa-wand-magic-sparkles"
            } else if (singleLabel.toLowerCase() === "documentation") {
                labelBgColor = "bg-[#dbebff] text-[#5e88eb] border-[#5e88eb] hover:bg-[#5e88eb] hover:text-white";
                labelIcon = "fa-solid fa-file-lines"
            } else {
                labelBgColor = "bg-[#ece4ff] text-[#a647ff] border-[#a647ff] hover:bg-[#a647ff] hover:text-white ";
                labelIcon = "fa-solid fa-circle-info"
            }
            return `<span class="px-2 py-1 text-sm font-medium capitalize  rounded-full border ${labelBgColor}"><i class="${labelIcon}"></i> ${singleLabel}</span>`


        }).join(" ");


        newCard.innerHTML = `
   <div class="card bg-white p-5 border-t-5 ${topBorderColor} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col gap-4 h-full">   
  <!-- Top Section: Status & Priority -->
  <div class="flex justify-between items-center"> 
    <img class="w-9 h-9" src="${statusIcon}" alt="">
    <span class="font-medium px-6 py-2 text-sm rounded-full ${priorityBadge}  ">${issueItem.priority.toUpperCase()}</span>
  </div>

  <!-- Content Section -->
  <div class="space-y-2 mt-2">
    <h1 class="font-bold text-slate-900 text-lg leading-tight hover:text-indigo-600 transition-colors">${issueItem.title}</h1>
    <p class="text-sm text-gray-600">${issueItem.description}</p>
  </div>

  <!-- Labels Section -->
  <div class="flex flex-wrap gap-2">
  ${labelsHtml}
    
  </div>

  <!-- Footer Section -->
  <div class="mt-auto pt-4 border-t border-gray-100 text-[10px] text-[#64748B] flex flex-col gap-1">
    <span class="text-xs"><i class="fa-regular fa-user mr-1"></i> #${issueItem.id} by ${issueItem.author}</span>
    <span class="text-xs"><i class="fa-regular fa-calendar mr-1"></i>${issueItem.createdAt}</span>
  </div>

  </div>
        `

        cardArea.append(newCard)
    })

}