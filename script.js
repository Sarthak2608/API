class Repository
{
	constructor(name,forks)
	{
		this.commit=[]
		this.repo_name=name;	//It stores the name of the Repository
		this.forks=forks;	//It stores the number of forks 
	}
	setTopContributors(commit) //commit is a array of class Commit_user
	{
		this.commit=commit;
	}
}

class Commit_User
{
	constructor(user_name,total_commits)
	{
		this.user_name=user_name;
		this.total_commits=total_commits;
	}
}



async function getOrganisationRepo(token_no,org_name,n,m) {
	var page_no=1;
	let Repo=[];

	while(1){ 
		
		//Fetching all Repository 
		u='https://api.github.com/orgs/'+org_name+'/repos'+'?per_page=100&page='+page_no.toString();
		
		console.log(u);

		const response = await fetch(u,{
			"headers": {
				'Authorization': 'Token '+token_no,
			},
			"methods":"GET"
		});
    	console.log(response);
		// Storing data in form of JSON 
		var data = await response.json(); 
		if(data.length==0)
			break;
				

		try{
			for(let x of data)
			{
				//fetching only public Repository
				if(x.private==false){
					Repo.push(new Repository(x.name,x.forks));
				}
			} 
			console.log('Total Fetched Repositories: '+Repo.length);
		}
		catch(err)
		{
			//If the credentials are wrong or there is a problem in authorization then this block will execute. 
			console.log(err); 
			alert("Incorrect Data");
			return Repo;
		}
		page_no+=1;
	}

	console.log('Total Repositories: '+Repo.length);

	Repo.sort(function(a,b){return b.forks-a.forks}); //sorting the Repository in descending order on the basis of  forks

	while(Repo.length>n) //taking minimum(n,total repository) Repository
		Repo.pop();

	for(let i=0;i<Repo.length;i++)
	{
		let contributors_url='https://api.github.com/repos/'+org_name+'/'+Repo[i].repo_name+'/stats/contributors';
		
		let Commit=[]
		page_no=1;
		let last=[]
		let last_data={};
		while(1){
			// Fetching All contributors
			let u=contributors_url+'?per_page=100&page='+page_no.toString();
			console.log(u);
			const response = await fetch(u, {
				headers: {
					'Authorization': 'Token '+token_no,
				}
			});

			// Storing data in form of JSON 
			let data = await response.json(); 
			if(data.length==0)
				break;
			let ok=1;
			let nlast=[];
			try
			{
				for(let x of data)
				{
					if(last.length!=0&&last[0]==x.author.login)
					{
						ok=0;
						break;
					}
					Commit.push(new Commit_User(x.author.login,x.total));
					nlast.push(x.author.login);
				} 
			}
			catch(err)
			{
				console.log(err);
			}
			if(ok==0)
				break;
			last=nlast;


			//Sorting the contributors of the particular Repository on the basis of Commits.				
			Commit.sort(function(a,b){return b.total_commits-a.total_commits});
			
			//Taking Top min(m,Total contributors) Contributors
			while(Commit.length>m)
				Commit.pop();

			//Printing on the console (Top M Contributors of a Particular Repository)
			console.log('Repository Name:'+Repo[i].repo_name);
			Repo[i].setTopContributors(Commit);
			console.log('Contributors:')
			for(let j=0;j<Commit.length;j++)
				console.log(Commit[j].user_name);
			console.log(' ');
			page_no+=1;
		}
	}
	return Repo;
} 


		
function displayRepo(obj,org_name)
{
	var base_url='https://github.com';
	var s='';

	for(let i=0;i<obj.commit.length;i++)
	{	
		s+=`
			<a href="`+base_url+'/'+obj.commit[i].user_name+`" style="color:black;">
				<li class="list-group-item d-flex justify-content-between align-items-center">
			    	`+obj.commit[i].user_name+`
			   		<span class="badge badge-primary badge-pill" aria-label="Commit Counts">Commits:
			    	`+obj.commit[i].total_commits+`
			    	</span>
			  	</li>
		  	</a>`;
	}
	document.getElementById("output").innerHTML += `
			<div class="jumbotron" style="margin-left:10%;margin-right:10%;margin-top:5%;">
		  		<p class="lead">
			  		<h3>
				    	<a class="btn btn-primary btn-lg" href="`+base_url+'/'+org_name+'/'+obj.repo_name+`" role="button">
				    		`+obj.repo_name+`
				    	</a>
				   		<span class="badge badge-secondary">Forks:
				   			`+obj.forks+`
				   		</span>
			   		</h3>
		 		</p>
		  	 	<ul class="list-group">
				  `+s+`
				</ul>
			</div>
			`;
}

function start_loading()
{
	document.getElementById("output").innerHTML=`
			<h4>
				<center>
					<button class="buttonload badge badge-info">
			  			<i class="fa fa-spinner fa-spin"></i>
			  			Loading
					</button>	
				</center>
			</h4>`;
}


function stop_loading()
{	
	document.getElementById("output").innerHTML=``;	
}


function solve() {

	start_loading();

	//fetching the data from the HTML web Page
	let N=parseInt((document.getElementById('N').value));
	let M=parseInt((document.getElementById('M').value));
	let Org_Name=document.getElementById('Org_Name').value;
	let token_no=document.getElementById('Token_No').value;
			  	    
	(async () => {
		Repo=await getOrganisationRepo(token_no,Org_Name,N,M);
		
		stop_loading();
		for(let i=0;i<Repo.length;i++)
		{
			displayRepo(Repo[i],Org_Name);
		}					   
	})();
}