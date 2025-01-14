import matplotlib.pyplot as plt

def euler_forward(p_curr: float, h: float, K: float) -> float:
    return p_curr + h * (K * p_curr)

def plot_graph(x: list, y: list):
    plt.plot(x, y, marker='o')
    plt.xlabel("Time (t)")
    plt.ylabel("Population (P)")
    plt.title("Population Growth")
    plt.show()

if __name__ == "__main__":
    K = float(input("Enter the value of K: "))
    P0 = float(input("Enter the value of P0: "))
    h = float(input("Enter the value of h (interval gap): "))
    T = float(input("Enter the value of T: "))
    
    t_values = [0]
    p_values = [P0]
    curr_p = P0
    curr_t = 0
    
    # Calculate the values of P(t) using Euler's Forward method
    while curr_t < T:
        curr_p = euler_forward(curr_p, h, K)
        curr_t += h
        
        t_values.append(curr_t)
        p_values.append(curr_p)
        
    plot_graph(t_values, p_values)
        
    