// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract DabbaSystem {
    struct ProviderStage {
        string foodProviderId;
        string foodProviderName;
        string providerLocation;
        string timePickedUp;
        string collectorId;
        string collectorName;
    }

    struct CollectorStage {
        string collectionStation;
        string sortingTime;
    }

    struct ResidentialSorterStage {
        string residentialSorterId;
        string residentialSortStation;
        uint sortedBoxCount;
        string timeBoardedTrain;
    }

    struct TransporterStage {
        string transporterId;
        string trainNumber;
        string timeReachedDestination;
    }

    struct DestinationSorterStage {
        string destinationSorterId;
        uint boxesReceived;
        string[] receivedOrderIds;
        string timeToDistribute;
    }

    struct DistributionStage {
        string distributorId;
        string deliveryCenter;
        string[] distributedOrderIds;
        string deliveryTime;
        string receiverName;
    }

    struct CustomerStage {
        string customerConfirmed;
        string deliveryConfirmationTime;
    }

    struct DabbaLog {
        string orderId;
        string qrHash;
        ProviderStage provider;
        CollectorStage collector;
        ResidentialSorterStage residentialSorter;
        TransporterStage transporter;
        DestinationSorterStage destinationSorter;
        DistributionStage distribution;
        CustomerStage customer;
    }

    mapping(string => DabbaLog) public dabbaRecords;

    modifier orderExists(string memory _orderId) {
        require(bytes(dabbaRecords[_orderId].orderId).length != 0, "Order does not exist.");
        _;
    }

    modifier orderNotExists(string memory _orderId) {
        require(bytes(dabbaRecords[_orderId].orderId).length == 0, "Order already exists.");
        _;
    }

    // 1. Food Provider + QR Init
    function createOrder(
        string memory _orderId,
        string memory _qrHash,
        string memory _foodProviderId,
        string memory _foodProviderName,
        string memory _providerLocation,
        string memory _timePickedUp,
        string memory _collectorId,
        string memory _collectorName
    ) public orderNotExists(_orderId) {
        DabbaLog storage order = dabbaRecords[_orderId];
        order.orderId = _orderId;
        order.qrHash = _qrHash;
        order.provider = ProviderStage(
            _foodProviderId,
            _foodProviderName,
            _providerLocation,
            _timePickedUp,
            _collectorId,
            _collectorName
        );
    }

    // 2. Collector Stage
    function logCollectorStage(
        string memory _orderId,
        string memory _collectionStation,
        string memory _sortingTime
    ) public orderExists(_orderId) {
        dabbaRecords[_orderId].collector = CollectorStage(
            _collectionStation,
            _sortingTime
        );
    }

    // 3. Residential Sorter
    function logResidentialSortingStage(
        string memory _orderId,
        string memory _residentialSorterId,
        string memory _station,
        uint _sortedBoxCount,
        string memory _timeBoarded
    ) public orderExists(_orderId) {
        dabbaRecords[_orderId].residentialSorter = ResidentialSorterStage(
            _residentialSorterId,
            _station,
            _sortedBoxCount,
            _timeBoarded
        );
    }

    // 4. Transporter
    function logTransportStage(
        string memory _orderId,
        string memory _transporterId,
        string memory _trainNumber,
        string memory _timeReached
    ) public orderExists(_orderId) {
        dabbaRecords[_orderId].transporter = TransporterStage(
            _transporterId,
            _trainNumber,
            _timeReached
        );
    }

    // 5. Destination Sorter
    function logDestinationSortingStage(
        string memory _orderId,
        string memory _destinationSorterId,
        uint _boxesReceived,
        string[] memory _receivedOrderIds,
        string memory _timeToDistribute
    ) public orderExists(_orderId) {
        dabbaRecords[_orderId].destinationSorter = DestinationSorterStage(
            _destinationSorterId,
            _boxesReceived,
            _receivedOrderIds,
            _timeToDistribute
        );
    }

    // 6. Distribution Stage
    function logDistributionStage(
        string memory _orderId,
        string memory _distributorId,
        string memory _deliveryCenter,
        string[] memory _distributedOrderIds,
        string memory _deliveryTime,
        string memory _receiverName
    ) public orderExists(_orderId) {
        dabbaRecords[_orderId].distribution = DistributionStage(
            _distributorId,
            _deliveryCenter,
            _distributedOrderIds,
            _deliveryTime,
            _receiverName
        );
    }

    // 7. Customer Confirmation
    function logCustomerConfirmationStage(
        string memory _orderId,
        string memory _confirmation,
        string memory _confirmationTime
    ) public orderExists(_orderId) {
        dabbaRecords[_orderId].customer = CustomerStage(
            _confirmation,
            _confirmationTime
        );
    }

    // View Order Info
    function getOrder(string memory _orderId) public view returns (DabbaLog memory) {
        return dabbaRecords[_orderId];
    }
}
