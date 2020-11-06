
export class GitHubApi {
  static owner = 'withLoveAndSqualor';
  static repo = 'diploma';

  constructor () {
  }

  getCommits() {
    return fetch(`https://api.github.com/repos/${GitHubApi.owner}/${GitHubApi.repo}/commits`, {
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
