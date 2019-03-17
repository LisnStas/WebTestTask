
(function () {
    'use strict';

    angular.module('app').controller('UserListController', UserListController);

    UserListController.$inject = ['$scope', 'breeze', 'NgTableParams'];

    function UserListController($scope, breeze, NgTableParams) {
        var uc = this;

        uc.newItem = {};
        uc.editItem = editItem;
        uc.refreshData = refreshData;
        uc.isItemExists = isItemExists;
        uc.saveChanges = saveChanges;
        uc.rejectChanges = rejectChanges;
        uc.hasChanges = hasChanges;
        uc.addNewItem = addNewItem;
        uc.deleteItem = deleteItem;
        uc.filterByUserRequestDate = filterByUserRequestDate;
        uc.resetFilters = resetFilters;
        breeze.NamingConvention.camelCase.setAsDefault();

        var manager = new breeze.EntityManager("breeze/db");
        var usersQuery = new breeze.EntityQuery("Users").using(manager).expand("userRequests");
        var userRequestsQuery = new breeze.EntityQuery("UserRequests").using(manager);

        activate();

        function compaire(a, b) {
            if (a !== b) {
                refreshData();
            }
        }

        function activate() {

            refreshData();

            $scope.$watch('uc.filterUserName', compaire);
            $scope.$watch('uc.filterUserEmail', compaire);
            $scope.$watch('uc.filterUserNumber', compaire);

            $scope.$watch('uc.filterUserRequestAddress', compaire);
            $scope.$watch('uc.filterUserRequestDescription', compaire);
            $scope.$watch('uc.filterUserRequestDate', compaire);
        }

        function refreshData() {

            var query = userRequestsQuery;

            if (uc.filterUserName) {
                query = query.where('currentUser.name', breeze.FilterQueryOp.Equals, uc.filterUserName);
            }
            if (uc.filterUserEmail) {
                query = query.where('currentUser.email', breeze.FilterQueryOp.Equals, uc.filterUserEmail);
            }
            if (uc.filterUserNumber) {
                query = query.where('currentUser.number', breeze.FilterQueryOp.Equals, uc.filterUserNumber);
            }

            if (uc.filterUserRequestAddress) {
                query = query.where('address', breeze.FilterQueryOp.Equals, uc.filterUserRequestAddress);
            }

            if (uc.filterUserRequestDescription) {
                query = query.where('description', breeze.FilterQueryOp.Equals, uc.filterUserRequestDescription);
            }

            if (uc.filterUserRequestDate) {
                query = query.where('date', breeze.FilterQueryOp.Equals, uc.filterUserRequestDate);
            }

            usersQuery.execute()
                .then(
                function (data) {
                    uc.users = data.results;
                })
                .then(
                function () {
                    uc.userRequests = query.executeLocally();
                    uc.tableParams = new NgTableParams({
                        page: 1,
                        count: 5
                    }, {
                        counts: [5, 10, 20, 50, 100],
                        total: uc.userRequests.length,
                        dataset: uc.userRequests
                    });
                }
                );
        }

        function filterByUserRequestDate(dateString) {

            uc.filterUserRequestDate = new Date(dateString);
        }

        function saveChanges() {
            manager.saveChanges();
        }

        function rejectChanges() {
            manager.rejectChanges();
        }

        function hasChanges() {
            return manager.hasChanges();
        }

        function addNewItem() {
            var user = uc.users.filter(function (x) { return x.email === uc.newItem.email; });

            if (user.length === 0) {
                user = manager.createEntity('User', { name: uc.newItem.name, email: uc.newItem.email, number: uc.newItem.number });
                uc.users.push(user);
            } else {
                user = user[0];
                user.name = uc.newItem.name;
                user.number = uc.newItem.number;
            }
            var userRequest = uc.userRequests.filter(function (x) { return x.id === uc.newItem.id; });

            if (userRequest.length === 0) {
                userRequest = manager.createEntity('UserRequest', { address: uc.newItem.address, currentUser: user, description: uc.newItem.description, date: uc.newItem.date });
                uc.userRequests.push(userRequest);
            } else {
                userRequest = userRequest[0];
                userRequest.address = uc.newItem.address;
                userRequest.description = uc.newItem.description;
                userRequest.date = uc.newItem.date;
            }

            uc.newItem = {};

            uc.tableParams.reload();

            $scope.formAdd.$setPristine();
        }

        function deleteItem(item) {
            item.entityAspect.setDeleted();
        }

        function editItem(item) {
            uc.newItem.id = item.id;
            uc.newItem.name = item.currentUser.name;
            uc.newItem.email = item.currentUser.email;
            uc.newItem.number = item.currentUser.number;
            uc.newItem.address = item.address;
            uc.newItem.description = item.description;
            uc.newItem.date = item.date;

        }

        function resetFilters() {
            uc.filterUserName = undefined;
            uc.filterUserEmail = undefined;
            uc.filterUserNumber = undefined;
            uc.filterUserRequestAddress = undefined;
            uc.filterUserRequestDescription = undefined;
            uc.filterUserRequestDate = undefined;
            uc.filterUserRequestDateDate = undefined;
        }

        function isItemExists(x) {
            return x.entityAspect.entityState.name !== 'Deleted' && x.entityAspect.entityState.name !== 'Detached';
        }
    }
})();