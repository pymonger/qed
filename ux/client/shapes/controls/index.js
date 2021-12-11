// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
import styles from './styles'


const data = `
M 915.8859 676.6725
L 854.4735 635.6765
C 868.9722 595.5454 876.516 553.2343 876.7799 510.56525
L 948.2487 493.0889
C 966.488 488.63854 978.1379 470.7909 974.8716 452.3029
L 965.5384 399.2671
C 962.5434 382.27047 947.7974 369.8642 930.539 369.8209
C 929.2295 369.8221 927.9211 369.8922 926.619 370.0309
L 853.2369 378.1041
C 838.528 338.03897 817.1144 300.76626 789.9113 267.87923
L 833.4272 208.61354
C 844.5201 193.46912 841.9692 172.31734 827.594 160.24433
L 786.318 125.61823
C 771.9381 113.561 750.671 114.72437 737.6921 128.27819
L 686.733 181.57065
C 649.6988 160.37812 609.3091 145.68378 567.3149 138.1247
L 562.64834 64.53257
C 561.438 45.72101 545.7758 31.112456 526.9256 31.213115
L 473.0498 31.213115
C 454.2754 31.19893 438.7202 45.77363 437.5137 64.509235
L 432.70713 138.10136
C 390.71883 145.655 350.3359 160.34974 313.31243 181.54732
L 262.32993 128.27819
C 249.35103 114.72437 228.08395 113.561 213.70406 125.61823
L 172.4514 160.24433
C 158.05436 172.30554 155.50131 193.4754 166.61817 208.61354
L 210.13412 267.90257
C 182.92657 300.77787 161.51232 338.04372 146.80849 378.1041
L 73.42636 370.0309
C 72.11653 369.89176 70.80029 369.82167 69.48309 369.8209
C 52.22121 369.85473 37.46997 382.26544 34.483667 399.2671
L 25.150486 452.3029
C 21.81265 470.817 33.453498 488.73306 51.72672 493.20554
L 123.19554 510.6819
C 123.46425 553.3485 130.9997 595.6575 145.47851 635.7932
L 84.08952 676.7892
C 68.527435 687.2471 63.74181 707.9814 73.14637 724.20175
L 100.07259 770.86765
C 109.4541 787.1636 129.88982 793.3556 146.7385 785.0074
L 212.79408 752.3413
C 240.42823 784.8616 273.3646 812.473 310.20914 834.0066
L 289.53615 904.8688
C 284.32492 922.8045 293.85833 941.7185 311.3758 948.1981
L 361.98496 966.6311
C 379.62666 973.0524 399.22417 964.6826 406.78423 947.4981
L 436.48707 879.8325
C 478.46427 887.5169 521.4878 887.5169 563.465 879.8325
L 593.1912 947.4981
C 600.7418 964.6793 620.33185 973.0503 637.9671 966.6311
L 688.5996 948.1981
C 706.2312 941.7707 715.8546 922.7688 710.6026 904.7521
L 689.9296 833.8666
C 726.7702 812.3371 759.6996 784.725 787.3213 752.2013
L 853.4002 784.8674
C 870.2489 793.2156 890.6846 787.0236 900.0661 770.72765
L 926.9924 724.06175
C 936.3381 707.804 931.4822 687.0847 915.8859 676.6725
Z
M 499.97603 626.20336
C 452.43824 626.20335 409.58176 597.566 391.392 553.64594
C 373.20228 509.72584 383.26176 459.1731 416.8794 425.56214
C 450.497 391.9512 501.05176 381.90174 544.96825 400.1002
C 588.8847 418.29867 617.51354 461.1608 617.5041 508.6986
C 617.5041 539.86685 605.121 569.7582 583.0795 591.79526
C 561.03805 613.83235 531.14427 626.20954 499.97603 626.20336
Z`


// render the shape
export const Controls = ({ style }) => {
    // mix my paint
    const ico = { ...styles.icon, ...style?.icon }

    // paint me
    return (
        <path d={data} style={ico} />
    )
}


// end of file
