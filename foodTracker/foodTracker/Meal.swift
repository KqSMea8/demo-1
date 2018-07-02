//
//  Meal.swift
//  foodTracker
//
//  Created by Su,Fubo on 2018/7/1.
//  Copyright © 2018年 Su,Fubo. All rights reserved.
//

import UIKit

class Meal: ratingControl {
    var name: String
    var photo: UIImage?
    var rating: Int
    
    init?(name: String, photo: UIImage?, rating: Int) {
        if (name.isEmpty || rating < 0) {
            return nil
        }
    }
    
    self.name = name
    self.photo = photo
    self.rating = rating

    

    /*
    // Only override draw() if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func draw(_ rect: CGRect) {
        // Drawing code
    }
    */
    

}
