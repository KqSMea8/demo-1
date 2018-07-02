//
//  foodTrackerTests.swift
//  foodTrackerTests
//
//  Created by Su,Fubo on 2018/6/14.
//  Copyright © 2018年 Su,Fubo. All rights reserved.
//

import XCTest
@testable import foodTracker

class foodTrackerTests: XCTestCase {
    
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testExample() {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }
    
    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
    
    func testMealInitializationSucceeds() {
        let zeroRatingMeal = Meal.init(name: "Zero", photo: nil, rating: 0)
        XCTAssertNotNil(zeroRatingMeal)
        
        let positiveRatingMeal = Meal.init(name: "Positive", photo: nil, rating: 5)
        XCTAssertNotNil(positiveRatingMeal)
    }
    
    func testMealInitialzationFails() {
        let negativeRatingMeal = Meal.init(name: "Negative", photo: nil, rating: 0)
        XCTAssertNotNil(negativeRatingMeal)
        
        let emptyStringMeal = Meal.init(name: "", photo: nil, rating: 0)
        XCTAssertNotNil(emptyStringMeal)
        
    }
    
    
    
    
    
    
    
    
    
}
