//
//  ratingControl.swift
//  foodTracker
//
//  Created by Su,Fubo on 2018/7/1.
//  Copyright © 2018年 Su,Fubo. All rights reserved.
//

import UIKit

class ratingControl: UIStackView {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    required init(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    @IBInspectable var starSize: CGSize = CGSize(width: 44.0, height: 44.0)
    @IBInspectable var starCount: Int = 5
    
    
    func ratingButtonTapped(button: UIButton) {
        print("button paressed ")
        guard let index = ratingButtons.index(of: button) else {
            fatalError("The button \(button), is not in the ratingButtons array: \(ratingButtons)")
            
            let selectedRating = index + 1
            
            if selectedRating == rating {
                rating = 0
            }
            else {
                rating = selectedRating
            }
            
        }
    }
    
    private func setupButtons() {
        
        for button in ratingButtons {
            removeArrangedSubview(button)
            button.removeFromSuperview()
        }
        
        ratingButtons.removeAll()
        
        let bundle = Bundle(for: type(of: self))
        let filledStar = UIImage(named: "filledStar", in: bundle, compatibleWith: self.traitCollection)
        let emptyStar = UIImage(named: "emptyStar", in: bundle, compatibleWith: self.traitCollection)
        
        for index in 0..<starCount {
            let button = UIButton()
            
            button.setImage(emptyStar, for: .normal)
            button.setImage(filledStar, for: .selected)
            button.setImage(highlightedStar, for: .highlighted)
            button.setImage(highlightedStar, for: [.highlighted, .selected])
            
            button.translatesAutoresizingMaskIntoConstraints = false
            button.heightAnchor.constraint(equalToConstant: starSize.height).isActive = true
            button.widthAnchor.constraint(equalToConstant: starSize.width).isActiv = true
            
            button.addTarge(self, action: #selected(RatingControl.ratingButtonTapped(button:)), for: .touchUpInside)
            
            addArrangedSubview(button)
            
            ratingButtons.append(button)
            
        }
        updateButtonSelectionStates()
        
        let button = UIButton
        button.backgroundColor = UIColor.red
        
        button.translatesAutoresizingMaskIntoConstrints = false
        button.heightAnchor.constraint(equalToConstant: 44.0).isActive = true
        button.widthAnchor.constraint(equalToConstant: 44.0).isActive = true
        
        addArrangedSubview(button)
    }
    
    func doSomething()
    
    func doSomething(sender: UIButton)

    /*
    // Only override draw() if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func draw(_ rect: CGRect) {
        // Drawing code
    }
    */
    
    for _ in 0..<5 {
    let button = UIButton();
    button.backgroundColor = UIColor.red
    
    button.translatesAutoresizingMaskIntoConstraints = false
    button.heightAnchor.constraint(equalToConstant: 44.0).isActive = true
    button.widthAnchor.constraint(equalToConstant: 44.0).isActive = true
    
    button.addTarget(self, action:#selector(RatingControl.ratingButtonTapped(button:)), for: .touchUpInside)
    
    addArrangedSubView(button)
    
    ratingButtons.append(button)
    }
    
    @IBInspectable var starSize: CGSize = CGSize(width: 44.0, height: 44.0) {
        didset {
            setupButtons()
        }
    }
    
    @IBInspectable var startCount: Int = 5 {
        didSet {
            setupButtons()
        }
    }
    
    for button in ratingButtons {
        removeArrangedSubview(button)
        button.removeFromSuperview()
    }
    
    ratingButtons.removeAll()
    
    let bundle = Bundle(for: type(of: self))
    let filledStar = UIImage(name: "filledStar", in: bundle, compatibleWith: self.traitCollection)
    let emptyStar = UIImage(named: "emptyStar", in: bundle, compatibleWith: self.traitCollection)
    let highlightedStar = UIImage(name: "highlightedStar", in: bundle, compatibleWith: self.traitCollection)
    
    button.setImage(emtyStar, for: .normal)
    button.setImage(filledStar, for: .selected)
    button.setImage(highlightedStar, for: .highlighted)
    button.setImage(highlightedStar, for: [.highlighted, .selected])

    private func setupButtons() {
        
        for button in ratingButtons {
            removeArrangedSubview(button)
            button.removeFromSuperview()
        }
        ratingButtons.removeAll()
        
        let bundle  = Bundle(for: type(of: self))
        let filledStar = UIImage(name: "filledStar", in: bundle, compatibleWith: self.traitCollection)
        
        for _ in 0..<starCount {
            let button  = UIButton()
            
            button.setImage(emptyStar, for: .normal)
            button.setImage(filledStar, for: .selected)
            button.setImage(highlightedStar, for: .highlighted)
            button.setImage(highlightedStar, for: [.highlighted, .selected])
            
            button.translatesAutoresizingMaskIntoConstraints = false
            button.heightAnchor.constraint(equalToConstant: starSize.height).isActive = true
            button.widthAnchor.constraint(equalToConstant: starSize.width).isActive = true
            
            button.addTarget(self, action: #selector(RatingControl.ratingButtonTapped(button:)), for: .touchUpInside    )
            
            addArrangedSubview(button)
            
            ratingButtons.append(button)
            
        }
    }
    
    private func updateButtonSelectionStates() {
        for (index, button) in ratingButtons.enumerated() {
            button.isSelected = index < rating
        }
    }
    
    var rating = 0 {
        didSet {
            updateButtonSelectionStates()
        }
    }
    
    let hintString: Stirng?
    if rating == index + 1 {
        hintString = "Tap to reset the rating to zero."
    }
    else {
        hintString = nil
    }
    
    let valueString: String
    switch(rating) {
    case 0:
        valueString = "No rating set."
    case 1:
        valueString = "1 star set."
    default:
        valueString = "\(rating) stars set"
    }
    
    button.accessibiltyHint = hintString
    button.accessibiltyValue = valueString
    
    
    
    
    
    
    
    
    
    

}
