# Github API

## Problem Statement:
Find the N most popular repositories of a given organization on Github (Eg:vlgiitr) based on the number of forks. For each such repo find the top M committees and their commit counts.

Committees are the users who made a commit to the repository. Top m committee means, the top m users who have made the most number of commits to a given repository sorted by the total number of commits in the descending order.

## Solution:
1. I have made the Web Page which takes the value of Organisation name , N and M.
1. Then when we click on *Show me* ,then onclick() method is called,Inside the function, I am fetching the input values using Javascript.
1. I am using [Github Api](https://developer.github.com/v3/orgs/) to fetch all repository name and Fork. Then I am sorting the Repository in descending order on the basis of forks then I take the atmost N top Repository.
1. For each Repository ,I am Fetching the Contributors and their Commits.After this I am sorting the Users on the basis of commits in descending order then I am taking the the atmost M top Repository.

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
