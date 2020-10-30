export default class Helper {
    
GetIdentityID(identity) {
    return identity.value.id.value.classificationID.value.idString + "|" +
        identity.value.id.value.hashID.value.idString
}

GetAssetID(asset) {
    return asset.value.id.value.classificationID.value.idString +  "|" +
        asset.value.id.value.hashID.value.idString
}

GetOrderID(order) {
    return order.value.id.value.classificationID.value.idString +  +
        order.value.id.value.makerOwnableID.value.idString + "*" +
        order.value.id.value.takerOwnableID.value.idString + "*" +
        order.value.id.value.makerID.value.idString + "*" +
        order.value.id.value.hashID.value.idString
}

GetIdentityIDs(identities) {
    const idList = [];
    identities.forEach(function (identity) {
        idList.push(identity.value.id.value.classificationID.value.idString + "|" + identity.value.id.value.hashID.value.idString)
        return idList;
    })

    return idList;
   
}

FilterIdentitiesByProvisionedAddress(identities, address) {
    return identities.filter(function filterFunc(identity) {
        return identity.value.provisionedAddressList.includes(address)
    })
}

FilterSplitssByIdentitie(identities, splits) {
    var identityOwenrIdlist = this.GetIdentityIDs(identities)
    return splits.filter(function filterFunc(split) {
     return identityOwenrIdlist.filter(function filterFunc(identityOwenrId) {
        if(identityOwenrId === split.value.id.value.ownerID.value.idString){
            return split.value.id.value.ownerID.value.idString;
            }
        })
    })
}
GetIdentityOwnableId(identities) {
    const ownableIdList = [];
    identities.forEach(function (identity) {
        ownableIdList.push(identity.value.id.value.ownableID.value.idString)
        return ownableIdList;
    })
    return ownableIdList;
}
ParseProperties(properties){
    var propertyList = properties.result.value.assets.value.list[0].value.immutables.value.properties.value.propertyList;
    var propertiesDictionary = {};
    propertyList.forEach(function(property){
        propertiesDictionary[property.value.id.value.idString] = property.value.fact.value.hash;
    })
    return propertiesDictionary
}
}

