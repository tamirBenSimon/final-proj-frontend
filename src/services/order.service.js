import {storageService} from './storage.service.js'

const KEY = 'ordersDB';

const gOrders = _makeOrders();

function _makeOrders() {
    const orders = storageService.load(KEY);
    if (!orders || !orders.length) {
        orders = [{
            _id: 'sasasa',
            at: 1420120526000,
            by: {fullName: 'ariel zissu', _id: 101, imgURL: `https://i.picsum.photos/id/552/200/250.jpg`},
            from: {fullName: 'vlad indikt', _id: 102},
            product: {
                _id: 'p123',
                title: 'the life, of muki',
                price: 899},
            status: 'ordered',
            shippingInfo: {
              lat:32.085300, lng:34.781769
            }},
            {
            _id: 'sasdasd2a',
            at: 1390120526000,
            by: {fullName: 'tamir ben simom', _id: 103, imgURL: `https://i.picsum.photos/id/562/200/250.jpg`},
            from: {fullName: 'vlad indikt', _id: 102},
            product: {
                _id: 'p125',
                title: 'go take a walk',
                price: 29,},
            status: 'ordered',
            shippingInfo: {
              lat:31.784217, lng:34.691032
            }},
            {
            _id: 'assda2wq',
            at: 1519120526000,
            by: {fullName: 'ariel zissu', _id: 101, imgURL: `https://i.picsum.photos/id/552/200/250.jpg`},
            from: {fullName: 'vlad indikt', _id: 102},
            product: {
                _id: 'p126',
                title: 'breathe in the corona',
                price: 89,},
            status: 'ordered',
            shippingInfo: {
              lat:32.412429, lng:34.927134
            }}]
        storageService.store(KEY,orders);
        return orders;
    }
}

function query(sellerId) {
    if (!sellerId) return gOrders;
    sellerOrders = gOrders.filter(order => order.from._id === sellerId)
    return sellerOrders
}

function remove(orderId) {
    const idx = gOrders.findIdx(order => order._id !== orderId)
    gOrders.splice(idx,1)
    storageService.save(KEY,gOrders)
    return gOrders;
}