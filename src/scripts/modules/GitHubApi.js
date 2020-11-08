
export class GitHubApi {

  constructor (owner, repo) {
    this.owner = owner;
    this.repo = repo;
  }

  getCommits() {
    return fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/commits`, {
      method: 'GET'
    })
    .then ((res) => {
      if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }else {
      return res.json();
    }
    })
  }

}
