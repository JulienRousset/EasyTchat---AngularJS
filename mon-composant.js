'use strict';

angular.module('components').component("monComposant", {   /// je déclare mon component

	templateUrl: './mon-composant.html', // 

	bindings: {

		user: '<',
		error: '@',
		msg: '<'

	},

	controller: ['NomService', '$timeout', function (NomService, $timeout) {
		self = this;
		this.pseudo = "Visiteur";
	
		this.$onInit = () => {
			self.Chat();
			self.VoteAlls();
		};


		this.Chat = () => {
			 $timeout(function () {
				self.Chat();
				self.VoteAlls();
			    console.log("Refresh tchat")
			 }, 1000);
			NomService.tchatAll().then((response) => {
				this.chatAll = response.data;
			}).catch((response) => {
				this.error = response.statusText || "une erreur s'est produite";
			});
		}

		this.VoteAlls = () => {
			NomService.VoteAll().then((response) => {
				this.voteAlls = response.data;
			}).catch((response) => {
				this.error = response.statusText || "une erreur s'est produite";
			});
		}
		function addvotes(id, vote, pseudo) {
			var voteNew = vote + 1;
			NomService.addVote(id, voteNew, pseudo).then((response) => {
				console.log("Tu viens de liker");
			}).catch((response) => {
				self.error = response.statusText || "une erreur s'est produite";
			});
		}
		this.voteAdd = (id, pseudo, vote) => {
			NomService.checkVote(id, pseudo).then((response) => {
				if (response.data["0"] == null) {
					addvotes(id, vote, pseudo);
				} else {
					alert("tu as déjà voter")
				}
			}).catch((response) => {
				this.error = response.statusText || "une erreur s'est produite";
			});
		}

		this.addChat = (pseudo, msg) => {
			console.log("ntm");
			var add = {
				id: "",
				pseudo: pseudo,
				content: msg,
				vote: "",
			};
			NomService.addTchat(add).then((response) => {
				self.$onInit();
			}).catch((response) => {
				self.error = response.statusText || "une erreur s'est produite";
			});
		}
	}]



});