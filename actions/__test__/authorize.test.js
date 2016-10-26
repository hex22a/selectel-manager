/**
 * Created by x22a on 26.10.16.
 * Unit tests for authorization
 * Swift v1
 */

var nock = require('nock');
var authorize = require('../authorize');

var selcdn = nock(' https://api.selcdn.ru/auth/v1.0')
    .get('/')
    .reply(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': ' X-Expire-Auth-Token, X-Storage-Url, X-Storage-Token, X-Auth-Token',
        'Content-Type': ' text/plain; charset=utf-8',
        'X-Auth-Token': ' some_token',
        'X-Content-Type-Options': ' nosniff',
        'X-Expire-Auth-Token': ' 84562',
        'X-Storage-Token': 'some_storage_token',
        'X-Storage-Url': 'https://api.selcdn.ru/v1/SEL_00000',
        'Date': 'Wed, 26 Oct 2016 07:28:37 GMT'
    });


describe('Tests authorize module', function () {
    it('Should call back function with proper xUrl', function () {
            authorize('example_login', 'example_password', function (error, result) {
                expect(error).toBeFalsy();
                expect(result.success).not().toBeFalsy();
                console.log(result.xUrl);
                expect(result.xUrl).toMatch(/'https:\/\/api.selcdn.ru\/v1\/SEL_(\d)+/)
            })
        });
});