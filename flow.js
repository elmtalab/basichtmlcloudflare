function kyc_item_flow(id){
	// setItem the flow of operation in local storage
    localStorage.setItem('kyc_item_flow', id);
    // For every KYC procedure we need to create a separate HTML form and design its seperate procedure
	if (id == 1){
        window.location.href = "/profile.html";
    } else if (id == 2) {
        window.location.href = "/credit.html";
    }
    console.log(id)

}

//timeout for calling an API with xhrRequests
       setTimeout(()=>{ 
                kyc_docs_and_flows()
       }, 1);
            


    function kyc_docs_and_flows() {
        var data = JSON.stringify({ "public_key": localStorage.getItem('public_key') });
        if (localStorage.getItem('public_key') == null) {
            //redirect to main pages
            window.location.href = "/";
            console.log("login failed")
        } else {
            

            var xhr_memo = new XMLHttpRequest();
        xhr_memo.responseType = 'json';
        
        xhr_memo.addEventListener("readystatechange", function () {
        

    if(this.readyState === 4 && this.status === 200) {
        const kyc_items_ = this.response["kyc_items"];
        var nestable_ = `<ol class="dd-list">`
        // for each items in kyc_items_ get the followeing variables: data , xyz, fgh
        for (var i = 0; i < kyc_items_.length; i++) {
            var kyc_item_ = kyc_items_[i];
            var kyc_item_id = kyc_item_["id"];
            var kyc_item_kyc_procedure_id = kyc_item_["kyc_procedure_id"];
            //set kyc_procedure_id to localStorage
            localStorage.setItem('kyc_procedure_id', kyc_item_kyc_procedure_id);
            var kyc_item_procedure_status = kyc_item_["procedure_status"];
            //set kyc_procedure_id to localStorage
            localStorage.setItem('procedure_status', kyc_item_procedure_status);
            var kyc_item_content = kyc_item_["content"];
            var kyc_item_button_content = kyc_item_["button_content"];
            var href = kyc_item_["href"];
            nestable_ += `<li class="dd-item dd3-item" data-id="${kyc_item_id}" onclick="kyc_item_flow(${kyc_item_id})">   
										<div class="dd3-content" style="height: fit-content;display: block ruby;height: 35px;" >${kyc_item_content}  
										<div style="float: initial;" ><div class="btn-group">
											<button type="button " class="button primary-btn1" onclick="" style="width: 100px;">${kyc_item_button_content}</button>
										</div>
                                        </div>
										</div>
						                </li>
						            `

        }

        nestable_ += `</ol>`;
        document.getElementById("nestable").innerHTML = nestable_;
    }
    });

    xhr_memo.open('POST', "https://kyc-flow.elmtalab3638.workers.dev", true);
    xhr_memo.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr_memo.send(data);
            
          }


    
    }

