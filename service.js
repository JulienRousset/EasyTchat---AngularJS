angular.module('services').service('NomService', function ($http) {
	this.tchatAll = () => {
		return $http.get('http://127.0.0.1:3000/chat?_sort=id&_order=DESC&_end=5');
	};
	this.VoteAll = () => {
		return $http.get('http://127.0.0.1:3000/vote/');
	};
	this.addTchat = (add) => {
		return $http.post('http://127.0.0.1:3000/chat/', add);
	};
	this.checkVote = (id, token) => {
		return $http.get('http://127.0.0.1:3000/vote?tchatId=' + id + '&pseudo=' + token + '');
	};

	this.addVote = (id, voteNew, pseudo) => {
		$http.post('http://127.0.0.1:3000/vote/', { "id": "", "tchatId": id, "pseudo": pseudo });
		$http.patch('http://127.0.0.1:3000/chat/' + id + '', { "vote": voteNew });
	};
});