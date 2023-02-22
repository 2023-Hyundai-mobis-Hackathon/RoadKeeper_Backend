import sys

def road_score(garbage_num, pothole_num, animal_num, report_num, report_actioned_num):
    # category = 도로에서 detection된 물체중 category 특정 카테고리 개수
    # report_num = 도로에서 누적된 신고횟수
    # report_actioned_num = 조치된 위해 요소 갯수
    road_score = 0
    report_num = report_num
    report_actioned_num = report_actioned_num
    total = garbage_num + pothole_num+animal_num

    garbage_score = float(0.8*garbage_num) - float(0.85*report_actioned_num*(garbage_num/total))
    pothole_score = float(0.9*pothole_num) - float(0.85*report_actioned_num*(pothole_num/total))
    animal_score = float(0.85*animal_num) - float(0.85*report_actioned_num*(animal_num/total))

    road_score = garbage_score+pothole_score+animal_score+report_num
    print(road_score, end='')
    return road_score

if __name__ == "__main__":
    road_score =road_score(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])