package com.example.request;

import java.util.List;

import com.example.model.Category;
import com.example.model.IngredientsItem;

import lombok.Data;

@Data
public class CreateFoodRequest {

    private String name;

    private String description;

    private Long price; 

    private Category category;

    private List<String> images;

    private Long restaurantId;

    private boolean vegetarian;

    private boolean seasonal;

    private List<IngredientsItem> ingredients;

}
