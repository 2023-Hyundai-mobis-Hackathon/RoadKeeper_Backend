import sys
import random

def danger_priority_score(category, bbox_location='wide', bbox_size='medium'):
    # category = bbox한개에 해당하는 category
    danger_score = 0
    category = category
    category_weight = 0.5 # category_weight 초기값은 0.5로 설정
    bbox_location = bbox_location # bbox_location은 일단 고정값(0.8)으로 설정
    bbox_location_weight = 0.8
    bbox_size = bbox_size
    bbox_size_weight = 13
    
    # 임의로 랜덤하게 지정
    location_weight_list = [0.9, 0.8, 0.7]
    size_weight_list = [15, 13, 11]
    rand_idx1 = random.randrange(0,3)
    rand_idx2 = random.randrange(0,3)
    bbox_location_weight = location_weight_list[rand_idx1]
    bbox_size_weight = size_weight_list[rand_idx2]

    if category == "Pothole on road":
        category_weight = 0.9
    elif category == "Animals(Dolls)":
        category_weight = 0.85
    elif category == "Garbage bag & sacks":
        category_weight = 0.8
    elif category == "Box":
        category_weight = 0.75
    elif category == "Manhole":
        category_weight = 0.7
    elif category == "Person":
        category_weight = 0.65
    elif category == "Construction signs & Parking prohibited board":
        category_weight = 0.6
    elif category == "Traffic cone":
        category_weight = 0.55
    elif category == "Filled pothole":
        category_weight = 0.5
    else:
        category_weight = 0.5

    # # bbox_location에 따라서 weight값 설정, 일단은 bbox위치계산 구현X
    # if bbox_location == "central":
    #     bbox_location_weight = 0.9
    # elif bbox_location == "wide":
    #     bbox_location_weight = 0.8
    # elif bbox_location == "wider":
    #     bbox_location_weight = 0.7
    # else:
    #     bbox_location_weight = 0.8

    # # bbox_size 따라서 weight값 설정, 일단은 bbox크기계산 구현X
    # if bbox_size == "large":
    #     bbox_size_weight = 15
    # elif bbox_size == "medium":
    #     bbox_size_weight = 13
    # elif bbox_size == "small":
    #     bbox_size_weight = 11
    # else:
    #     bbox_size_weight = 13
    
    danger_score = float(100*category_weight*bbox_location_weight)+float(bbox_size_weight)
    print(danger_score, end='')
    return danger_score

if __name__ == "__main__":
    danger_score = danger_priority_score(sys.argv[1])