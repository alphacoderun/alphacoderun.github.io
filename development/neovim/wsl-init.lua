vim.g.mapleader = " "

vim.lsp.enable('pyright')
vim.lsp.enable('gopls')
vim.lsp.enable('html')
vim.lsp.inlay_hint.enable(true)
vim.lsp.codelens.enable(true)

vim.opt.completeopt = "menu,menuone,noselect,popup,fuzzy"
vim.o.autocomplete = true
vim.o.complete = ".,w,b,o"
vim.o.autocompletedelay = 250


vim.api.nvim_create_autocmd("LspAttach", {
  group = vim.api.nvim_create_augroup("lsp_completion", { clear = true }),
  callback = function(args)
    local client_id = args.data.client_id
    if not client_id then
                return
        end
        local_client = vim.lsp.get_client_by_id(client_id)
                if client and client:supports_method("textDocument/completion") then
                        vim.lsp.completion.enable(true, client_id, args.buf, {
                                autotrigger = true,
                        })
                end
        end,
})

vim.cmd('packadd nvim-dap')
vim.cmd('packadd nvim-nio')
vim.cmd('packadd nvim-dap-ui')
vim.cmd('packadd nvim-dap-virtual-text')

local dap = require("dap")
local dapui = require("dapui")

-- Setup UI and virtual text
dapui.setup()
require("nvim-dap-virtual-text").setup()

-- Automatically open/close DAP UI on events
dap.listeners.after.event_initialized["dapui_config"] = function()
  dapui.open()
end
dap.listeners.before.event_terminated["dapui_config"] = function()
  dapui.close()
end
dap.listeners.before.event_exited["dapui_config"] = function()
  dapui.close()
end


vim.keymap.set('n', '<leader>db', function() dap.toggle_breakpoint() end, { desc = 'Toggle [D]ebug [B]reakpoint' })
vim.keymap.set('n', '<leader>dc', function() dap.continue() end, { desc = 'Debug [C]ontinue / Start' })
vim.keymap.set('n', '<leader>so', function() dap.step_over() end, { desc = 'Debug Step [O]ver' })
vim.keymap.set('n', '<leader>si', function() dap.step_into() end, { desc = 'Debug Step [I]nto' })
vim.keymap.set('n', '<leader>su', function() dap.step_out() end, { desc = 'Debug Step o[U]t' })
vim.keymap.set('n', '<leader>dr', function() dap.repl.toggle() end, { desc = 'Toggle Debug [R]EPL' })

require('dap-go').setup()


local python_path = vim.fn.exepath("python3") or vim.fn.exepath("python")
require("dap-python").setup(python_path)


