# Github API

## Problem Statement:
Find the N most popular repositories of a given organization on Github (Eg:vlgiitr) based on the number of forks. For each such repo find the top M committees and their commit counts.

Committees are the users who made a commit to the repository. Top m committee means, the top m users who have made the most number of commits to a given repository sorted by the total number of commits in the descending order.

## Solution:
1. Firstly ,User has to give the value of Organisation name , N and M.
1. When User clicks on *Show me* ,then onclick() method is called.
1. [Github Api](https://developer.github.com/v3/orgs/) is used to fetch all the name and fork of each Repository then using inbuilt Sort() method ,the Repositories name is sorted in descending order on the basis of forks then we take the atmost N top Repository.
1. For each Repository ,[Github Api](https://developer.github.com/v3/orgs/) is used to fetch all the Contributors and their Commits,the Contributors name is sorted in descending order on the basis of commits then we take the atmost M top Repository.

*Note:Due to large number of repository and number of contributors ,Total Number of API call is large so I am using Github Token Authorisation.* 

## Steps to generate Tokeen Number:
* First fill Organisation name( like - google) ,N, M
* Generate Token number from Your Github Account ,on the [https://github.com/settings/tokens](https://github.com/settings/tokens) , click on *Generate New Token* then copy the token.

## Tools and Technologies Used
* HTML
* CSS
* Javascript
* Github Api

## Web Page Link
[https://sarthak2608.github.io/Github-API/](https://sarthak2608.github.io/Github-API/)

## Output Screenshots

![GitHub Logo](/images/i1.png)
![GitHub Logo](/images/i2.png)
<br><br>
![GitHub Logo](/images/i3.png)
![GitHub Logo](/images/i4.png)
