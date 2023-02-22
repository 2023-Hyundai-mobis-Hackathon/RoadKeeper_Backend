import sys

def user_score(detect_danger_num, report_num, report_actioned_num):
    # detect_danger_num = 발견한 위해요소 개수
    # report_num = 사용자 신고 횟수
    # report_actioned_num = 신고한 위해 요소중 조치된 건수
    score = 0.0
    detect_danger_num = detect_danger_num
    report_num = report_num
    report_actioned_num = report_actioned_num
    score = float(detect_danger_num) + float(report_num/detect_danger_num) + float(report_actioned_num/report_num)
    
    print(score, end='')
    return score

if __name__ == "__main__":
    score = user_score(sys.argv[1], sys.argv[2], sys.argv[3])